import React from "react";

import "./shop.scss";
import CollectionPreview from "../../components/collection-preview/collection-preview";
import SHOP_DATA from "./shop.data";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const {collections } = this.state;
    return (
        <div className='shop-page'>
              {
            collections.map(({id,...otheCollectionsProps}) =>(
         <CollectionPreview key={id} {...otheCollectionsProps} />))
        }
        </div>
      
    );
    }
}
export default ShopPage;
