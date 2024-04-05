import React from 'react';
import ReactToPrint from 'react-to-print';
import PrintComponent from './PrintComponent';

class PrintPreview extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => this.componentRef}
        />
        <PrintComponent ref={ref => (this.componentRef = ref)} />
      </div>
    );
  }
}

export default PrintPreview;
