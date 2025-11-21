---
sidebar_position: 1
---

# SDK API Document Intro

To improve **software quality**, we have added the RHAL API manager project..

## Add an API reference

You can refer to **RHAL_CEC_ADP.mdx** to create your API reference file and provide it to me.Please refer to **[RHAL_CEC_ADP文档](./rhal/RHAL_CEC_ADP)** for the final result.

````jsx title="docs/rhal/RHAL_CEC_ADP.mdx"
---
sidebar_position: 12
---

# RHAL_CEC_ADP

RHAL_CEC_ADP api

## RHAL_CEC_ADP_Open
```bash
HAL_CEC_STS RHAL_CEC_ADP_Open(void);
```
Open a RTK CEC Adapter

## RHAL_CEC_ADP_Close
```bash
HAL_CEC_STS RHAL_CEC_ADP_Close(void);
```
Close CEC ADP

## RHAL_CEC_ADP_SendMessage
```bash
HAL_CEC_STS RHAL_CEC_ADP_SendMessage(UINT8*pMsg, UINT8 Len);
```
Send a CEC Message onto CEC Bus
<ParamTable
  items={[
    { name: 'pMsg', type: 'UINT8*', desc: 'Message to submit' },
    { name: 'Len', type: 'UINT8', desc: <>Message length.</> },
  ]}
/>

## RHAL_CEC_ADP_ReadMessage
```bash
HAL_CEC_STS RHAL_CEC_ADP_ReadMessage(UINT8*pMsg, UINT8 Len, UINT8*pRxLen);
```
Read a CEC Message onto CEC Bus
<ParamTable
  items={[
    { name: 'pMsg', type: 'UINT8*', desc: 'Received Message' },
    { name: 'Len', type: 'UINT8', desc: <>The length of message buf .</> },
    { name: 'pRxLen', type: 'UINT8*', desc: <>An output parameter pointer used to return the number of bytes actually read..</> },
  ]}
/>

## RHAL_CEC_ADP_PollDevice
```bash
HAL_CEC_STS RHAL_CEC_ADP_PollDevice(UINT8 Dest);
```
Send Poll Message onto CEC Bus
<ParamTable
  items={[
    { name: 'Dest', type: 'UINT8', desc: 'The address of the device being polled' },
  ]}
/>

## RHAL_CEC_ADP_Enable
```bash
HAL_CEC_STS RHAL_CEC_ADP_Enable(UINT8 OnOff);
```
Enable CEC Adapter
<ParamTable
  items={[
    { name: 'OnOff', type: 'UINT8', desc: <> 0 : <code>0ff</code>, others : <code>on</code> </> },
  ]}
/>

## RHAL_CEC_ADP_SetLogicalAddress
```bash
HAL_CEC_STS RHAL_CEC_ADP_SetLogicalAddress(UINT8 LogicalAddr);
```
Set Logical address of CEC Adapter
<ParamTable
  items={[
    { name: 'LogicalAddr', type: 'UINT8', desc: 'logical address of CEC adapter' },
  ]}
/>

## RHAL_CEC_ADP_SetRetryNum
```bash
HAL_CEC_STS RHAL_CEC_ADP_SetRetryNum(UINT8 Num);
```
set retry times of rtd cec
<ParamTable
  items={[
    { name: 'Num', type: 'UINT8', desc: 'Retry times' },
  ]}
/>
````

## RHAL API Document supports Markdown and a few additional features.

### You can add detailed explanations for the parameters to the relevant API.

```HAL_CEC_STS RHAL_CEC_ADP_ReadMessage(UINT8*pMsg, UINT8 Len, UINT8*pRxLen);
<ParamTable
  items={[
    { name: 'pMsg', type: 'UINT8*', desc: 'Received Message' },
    { name: 'Len', type: 'UINT8', desc: <>The length of message buf .</> },
    { name: 'pRxLen', type: 'UINT8*', desc: <>An output parameter pointer used to return the number of bytes actually read..</> },
  ]}
/>
```
![parameter](/img/parameter.png)

### Links

Regular Markdown links are supported, using url paths or relative file paths.

```md
Let's see how to [RHAL_CEC_ADP文档](./rhal/RHAL_CEC_ADP).
```


### Images

Regular Markdown images are supported.

You can use absolute paths to reference images in the static directory (`static/img/REALTEK_Logo.jpg`):

```md
![REALTEK logo](/img/REALTEK_Logo.jpg)
```

![REALTEK logo](/img/REALTEK_Logo.jpg)

You can reference images relative to the current file as well. This is particularly useful to colocate images close to the Markdown files using them:

```md
![REALTEK logo](./img/REALTEK_Logo.jpg)
```

### Code Blocks

Markdown code blocks are supported with Syntax highlighting.

````md
```jsx title="src/components/Hello.js"
function Hello() {
  return <h1>Hello!</h1>;
}
```
````

```jsx title="src/components/Hello.js"
function Hello() {
  return <h1>Hello!</h1>;
}
```

### Admonitions

Docusaurus has a special syntax to create admonitions and callouts:

```md
:::tip My tip

Use this awesome feature option

:::

:::danger Take care

This action is dangerous

:::
```

:::tip My tip

Use this awesome feature option

:::

:::danger Take care

This action is dangerous

:::

### MDX and React Components

[MDX](https://mdxjs.com/) can make your documentation more **interactive** and allows using any **React components inside Markdown**:

```jsx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`)
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">green</Highlight> !

This is <Highlight color="#1877F2">blue</Highlight> !
```

export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '20px',
      color: '#fff',
      padding: '10px',
      cursor: 'pointer',
    }}
    onClick={() => {
      alert(`You clicked the color ${color} with label ${children}`);
    }}>
    {children}
  </span>
);

This is <Highlight color="#25c2a0">green</Highlight> !

This is <Highlight color="#1877F2">blue</Highlight> !
