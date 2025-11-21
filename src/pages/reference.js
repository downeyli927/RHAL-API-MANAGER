import React from 'react';

const RHAL_CEC_ADP = () => {
  return (
    <div className="page-reference">
      <h1>RHAL_CEC_ADP</h1>
      <p>RHAL_CEC_ADP api</p>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_Open</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_Open(void);</code>
        </div>
        <p>Open a RTK CEC Adapter</p>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_Close</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_Close(void);</code>
        </div>
        <p>Close CEC ADP</p>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_SendMessage</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_SendMessage(UINT8* pMsg, UINT8 Len);</code>
        </div>
        <p>Send a CEC Message onto CEC Bus</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>pMsg</td>
                <td>UINT8*</td>
                <td>Message to submit</td>
              </tr>
              <tr>
                <td>Len</td>
                <td>UINT8</td>
                <td>Message length.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_ReadMessage</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_ReadMessage(UINT8* pMsg, UINT8 Len, UINT8* pRxLen);</code>
        </div>
        <p>Read a CEC Message onto CEC Bus</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>pMsg</td>
                <td>UINT8*</td>
                <td>Received Message</td>
              </tr>
              <tr>
                <td>Len</td>
                <td>UINT8</td>
                <td>The length of message buf.</td>
              </tr>
              <tr>
                <td>pRxLen</td>
                <td>UINT8*</td>
                <td>An output parameter pointer used to return the number of bytes actually read.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_PollDevice</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_PollDevice(UINT8 Dest);</code>
        </div>
        <p>Send Poll Message onto CEC Bus</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dest</td>
                <td>UINT8</td>
                <td>The address of the device being polled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_Enable</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_Enable(UINT8 OnOff);</code>
        </div>
        <p>Enable CEC Adapter</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OnOff</td>
                <td>UINT8</td>
                <td>0 : off, others : on</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_SetLogicalAddress</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_SetLogicalAddress(UINT8 LogicalAddr);</code>
        </div>
        <p>Set Logical address of CEC Adapter</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LogicalAddr</td>
                <td>UINT8</td>
                <td>logical address of CEC adapter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="function-section">
        <h2>RHAL_CEC_ADP_SetRetryNum</h2>
        <div className="code-block">
          <code>HAL_CEC_STS RHAL_CEC_ADP_SetRetryNum(UINT8 Num);</code>
        </div>
        <p>set retry times of rtd cec</p>
        <div className="param-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Num</td>
                <td>UINT8</td>
                <td>Retry times</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default RHAL_CEC_ADP;