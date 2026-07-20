import React, { useState, useRef, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import './styles.css';

export default function AIAssistant() {
  const { siteConfig } = useDocusaurusContext();
  
  // Read config from Docusaurus customFields (which pulls from .env)
  const AI_API_URL = siteConfig.customFields.aiApiUrl || "/api/chat/completions";
  const AI_MODEL = siteConfig.customFields.aiModel || "gpt-5.6-luna";

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是 RHAL API MANAGER 的 AI 助手 🤖。我已经阅读了您当前浏览的页面，请问有什么我可以帮您的？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // 获取当前网页的核心内容，作为大模型的隐式上下文
      let pageContent = "未能获取到页面内容";
      const articleNode = document.querySelector('article') || document.querySelector('main') || document.body;
      if (articleNode) {
        // 截取前3000个字符避免超过Token限制
        pageContent = articleNode.innerText.slice(0, 3000);
      }

      const systemPrompt = `你是 RHAL API MANAGER 的专属智能助手。请用专业、友好的中文回答用户的问题。
要求：
1. 始终使用 Markdown 格式返回数据。如果涉及代码，请务必使用代码块包裹。
2. 尽可能利用以下上下文信息来帮助用户解答。
【上下文信息】以下是用户当前正在查看的网页文字内容：\n\n${pageContent}`;

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        // 只取最近的 6 条对话历史以节省 token
        ...newMessages.slice(-6).map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: Authentication is now handled entirely by the proxy server!
        },
        body: JSON.stringify({
          model: AI_MODEL,
          messages: apiMessages,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'system', content: '⚠️ 无法连接到 AI 后端，请检查网络或稍后重试。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-assistant-container">
      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <span>🤖 AI 助手</span>
            <button className="ai-close-btn" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          
          <div className="ai-chat-body">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`ai-message ${msg.role} ${msg.role === 'assistant' ? 'markdown-body' : ''}`}
                dangerouslySetInnerHTML={
                  msg.role === 'assistant' 
                    ? { __html: DOMPurify.sanitize(marked.parse(msg.content)) } 
                    : { __html: msg.content.replace(/\n/g, '<br/>') }
                }
              />
            ))}
            {isLoading && (
              <div className="ai-message assistant">
                <span className="ai-typing-indicator">正在思考中...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-input-container">
            <textarea
              className="ai-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="询问关于当前页面的内容..."
              disabled={isLoading}
              rows="2"
            />
            <button className="ai-send-btn" onClick={handleSend} disabled={isLoading || !input.trim()}>
              发送
            </button>
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="ai-floating-btn" onClick={() => setIsOpen(true)} title="打开 AI 助手">
          <span className="ai-btn-icon">🤖</span>
          <span className="ai-btn-text">AI 助手</span>
        </button>
      )}
    </div>
  );
}
