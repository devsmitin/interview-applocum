import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem, removeItem } from "../redux/cart/cartAction";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemIsAdded: false,
    };
  }

  componentDidMount() {
    // let { cartData } = this.props;
  }

  addItem = () => {
    let { product, addToCart } = this.props;
    this.setState({ itemIsAdded: !this.state.itemIsAdded }, () => {
      addToCart(product.Name);
    });
  };

  removeItem = () => {
    let { product, removeFromCart } = this.props;
    this.setState({ itemIsAdded: !this.state.itemIsAdded }, () => {
      removeFromCart(product.Name);
    });
  };

  render() {
    let { product } = this.props;
    let { itemIsAdded } = this.state;
    return (
      <div className="card card-body shadow-sm bg-light mb-3">
        <div className="row align-items-center">
          <div className="col-lg-3">
            <strong>{product.Name}</strong>
          </div>
          <div className="col-lg-3">
            <strong>Location:</strong> {product.Location}
          </div>
          <div className="col-lg-2">
            <strong>Price:</strong> {product.price}
          </div>
          <div className="col-lg-2">
            <strong>Quantity:</strong> {product.qty}
          </div>
          <div className="col-lg-2">
            {itemIsAdded ? (
              <button
                type="button"
                className="btn btn-danger w-100 mb-0"
                onClick={this.removeItem}
              >
                Remove
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success w-100 mb-0"
                onClick={this.addItem}
                disabled={product.qty === 0}
              >
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (name) => dispatch(addItem(name)),
  removeFromCart: (name) => dispatch(removeItem(name)),
});
const mapStateToProps = (state) => ({
  cartData: state.cart,
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
