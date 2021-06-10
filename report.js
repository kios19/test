var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
var globals = require('./variables')
import rows from './data.json';


module.exports = React.createClass({

  getInitialState: function () {
    return {
      text: 'nikucheza tu',
      start: false,
      api: true,
      data: [],
      loading: true
    };
  },

  playme (){
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(globals.dataurl, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result))
        this.setState({
          data: JSON.parse(result),
          loading: false
        })
      })
      .catch(error => console.log('error', error));
  },

  render: function () {
    var dimensions = [
      { value: 'productName', title: 'Product' },
      { value: 'category', title: 'Category' },
      { value: 'customerName', title: 'Customer' },
      { value: 'postalCode', title: 'postalCode' },
      { value: 'segment', title: 'Segment' },
      { value: 'country', title: 'Country' },
      { value: 'city', title: 'City' },
      { value: 'state', title: 'State' },
      { value: 'region', title: 'Region' },
      { value: 'subCategory', title: 'Sub Category' },
      { value: 'shipMode', title: 'Shipmode' },
      { value: 'shipDate', title: 'Shipdate' },

    ]

    var reduce = function (row, memo) {



      memo.quantityTotal = (memo.quantityTotal || 0) + parseFloat(row.quantity);

      memo.discountTotal = (memo.discountTotal || 0) + parseFloat(row.discount);

      memo.profitTotal = (memo.profitTotal || 0) + parseFloat(row.profit);

      memo.salesTotal = (memo.salesTotal || 0) + parseFloat(row.sales);

      if (row.category === "Office Supplies") {
        memo.officeTotal = (memo.officeTotal || 0) + parseFloat(row.quantity);
      }

      memo.count = (memo.count || 0) + 1
      return memo
    }

    var calculations = [
      { title: 'Quantity', value: 'quantityTotal' },
      { title: 'Discount', value: 'discountTotal' },
      { title: 'Profits', value: 'profitTotal' },
    ]

    return <div>
      {this.state.start ?
        <div>
          {this.state.api == false ? <ReactPivot rows={rows}
            dimensions={dimensions}
            reduce={reduce}
            calculations={calculations}
            nPaginateRows={35}
          /> : this.state.loading ? <div className="container3">
            <div className="circle">
              <div className="dots" />
            </div>
            <h3 style={{ paddingLeft: 100 }}>loading data...</h3>

          </div>
            : <ReactPivot rows={this.state.data}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations}
              nPaginateRows={35}
            />
          }
        </div>
        :
        <div className="container2" >

          <button className="btn-pill" onClick={() => {
            console.log("umefinya")
            this.setState({ start: true })
          }}>
            <span>Fill default</span>
          </button>
          <button className="btn-shine" onClick={() => {
            this.setState({ start: true, api: true })
            this.playme()
          }}>
            <span>Fill from API</span>
          </button>

        </div>
      }
    </div>
  }
})

