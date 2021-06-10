var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
import rows from './data.json';

module.exports = createReactClass({
  
  render() {
    var dimensions = [
      {value: 'productName', title: 'Product'},
      {value:'category',title:'Category'},
      {value:'customerName',title:'Customer'},
      {value:'postalCode',title:'postalCode'},
      {value:'segment',title:'Segment'},
      {value:'country',title:'Country'},
      {value:'city',title:'City'},
      {value:'state',title:'State'},
      {value:'region',title:'Region'},
      {value:'subCategory',title:'Sub Category'},
      {value:'shipMode',title:'Shipmode'},
      {value:'shipDate',title:'Shipdate'},

    ]

    var reduce = function(row, memo) {
      


      memo.quantityTotal = (memo.quantityTotal || 0) + parseFloat(row.quantity);

      memo.discountTotal = (memo.discountTotal || 0) + parseFloat(row.discount);

      memo.profitTotal = (memo.profitTotal || 0) + parseFloat(row.profit);

      memo.salesTotal = (memo.salesTotal || 0) + parseFloat(row.sales);

      if(row.category==="Office Supplies"){
        memo.officeTotal  = (memo.officeTotal || 0) + parseFloat(row.quantity);
      }

      memo.count = (memo.count || 0) + 1
      return memo
    }
  
    var calculations = [
      {title: 'Quantity', value: 'quantityTotal'},
      {title: 'Discount', value: 'discountTotal'},
      {title: 'Profits', value: 'profitTotal'},

      /*{title: 'Load Rate', value: 'loadRateTotal',
        template:function(val,row){
          return (((row.loadTotal ||0) / row.count)*100).toFixed(1)+'%';
        }
      },
      {title: 'Display Rate', value: 'loadRateTotal',
        template:function(val,row){
          return (((row.displayTotal||0) / row.count)*100).toFixed(1)+'%';
        }
      },*/
      
    ]
    return <div>
      <ReactPivot rows={rows}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations}
              nPaginateRows={35}
               />
    </div>
  }
})
