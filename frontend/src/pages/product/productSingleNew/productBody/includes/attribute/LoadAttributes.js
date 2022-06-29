import React from "react";
import {
  ConfiguratorAttributes, firstAttributeConfiguredItems,
  getProductGroupedAttributes
} from "../../../../../../utils/CartHelpers";
import { characterLimiter } from "../../../../../../utils/Helpers";

const LoadAttributes = (props) => {
  const { product, setActiveImg, cartStore, setCartStore } = props;

  const Attributes = product?.Attributes ? product.Attributes : [];
  const ConfigAttributes = ConfiguratorAttributes(Attributes);
  const groupItems = getProductGroupedAttributes(ConfigAttributes);

  const FirstAttribute = cartStore?.FirstAttribute || {};

  const ConfiguredItems = product?.ConfiguredItems ? product.ConfiguredItems : [];
  const activeConfiguredItems = firstAttributeConfiguredItems(ConfiguredItems, FirstAttribute);


  const selectFirstAttributes = (key, Attribute) => {
    setCartStore({ FirstAttribute: Attribute, Attributes: { [key]: Attribute } });
  };

  const setFirstAttributeOnLoad = (key, Attribute) => {
    if (FirstAttribute?.PropertyName !== key) {
      setCartStore({ FirstAttribute: Attribute, Attributes: { [key]: Attribute } });
    }
  };

  const selectAttribute = (key, Attribute) => {
    let oldAttributes = cartStore?.Attributes || {};
    setCartStore({ ...cartStore, Attributes: { ...oldAttributes, [key]: Attribute } });
  };

  const isExistOnFirstAttr = (Attribute, className = 'isSelect') => {
    const isSelect = FirstAttribute?.Pid === Attribute.Pid && FirstAttribute?.Vid === Attribute.Vid;
    return isSelect ? className : '';
  };

  const isExistOnSelectAttr = (key, Attribute, className = 'isSelect') => {
    let selectCartAttr = cartStore?.Attributes?.[key] || {};
    const isSelect = selectCartAttr?.Pid === Attribute.Pid && selectCartAttr?.Vid === Attribute.Vid;
    return isSelect ? className : '';
  };

  const isExistImageOnAttr = (Attribute, className = 'hasImage') => {
    return Attribute?.MiniImageUrl ? className : 'noImage';
  };


  const isExistsConfig = (Attribute, className = 'exists_config') => {
    let exists = false;
    if (activeConfiguredItems?.length > 0) {
      exists = activeConfiguredItems.find(findConfig => findConfig?.Configurators?.find(find => Attribute.Pid === find.Pid && Attribute.Vid === find.Vid))
    }
    return exists ? className : null;
  };

  const isExistsQuantity = (Attribute, className = '') => {
    let exists = false;
    if (ConfiguredItems?.length > 0) {
      exists = ConfiguredItems.find(findConfig => findConfig?.Configurators?.find(find => Attribute.Pid === find.Pid && Attribute.Vid === find.Vid));
      exists = parseInt(exists.Quantity) > 0;
    }
    return !exists ? className : null;
  };

  const currentActiveAttribute = (key) => {
    return cartStore?.Attributes?.[key] || {};
  };

  const firstGroup = groupItems?.length > 0 ? groupItems.slice(0, 1) : [];
  let otherGroups = groupItems?.length > 1 ? groupItems.slice(1) : [];

  // console.log('firstGroup', firstGroup);
  return (
    <div>
      {
        firstGroup.map((group, index) =>
          <div key={index} className="mb-3">
            <p>
              <b>{group.key} : </b>
              <span className="seller_info">{currentActiveAttribute(group.key)?.ValueAlias || currentActiveAttribute(group.key)?.Value}</span>
            </p>
            <div className="clearfix product-nav product-nav-thumbs">
              {
                group.values.map((Attribute, index2) =>
                  <div
                    key={index2}
                    onClick={() => selectFirstAttributes(group.key, Attribute)}
                    className={`attrItem text-center ${isExistOnFirstAttr(Attribute)} ${isExistImageOnAttr(Attribute)} ${isExistsQuantity(Attribute)}`}
                    title={(Attribute?.ValueAlias || Attribute.Value)}
                  >
                    {index2 === 0 && setFirstAttributeOnLoad(group.key, Attribute)}
                    {Attribute?.MiniImageUrl ?
                      <img src={Attribute.MiniImageUrl}
                        onClick={() => setActiveImg(Attribute.ImageUrl)}
                        alt={Attribute.Value}
                        style={{ width: '2.5rem', height: '2.5rem' }} />
                      : `${characterLimiter((Attribute?.ValueAlias || Attribute.Value), 15)}`
                    }
                  </div>
                )
              }
            </div>
          </div>
        )
      }
      {
        otherGroups?.length > 0 && otherGroups.map((group, index) =>
          <div key={index} className="mb-3">
            <p>
              <b>{group.key} : </b>
              <span className="seller_info">{currentActiveAttribute(group.key)?.ValueAlias || currentActiveAttribute(group.key)?.Value}</span>
            </p>
            <div className="clearfix product-nav product-nav-thumbs otherGroups">
              {
                group.values.map((Attribute, index2) =>
                  <div
                    key={index2}
                    onClick={isExistsConfig(Attribute) ? () => selectAttribute(group.key, Attribute) : e => e.preventDefault()}
                    className={`attrItem text-center ${isExistOnSelectAttr(group.key, Attribute)} ${isExistImageOnAttr(Attribute)} ${isExistsConfig(Attribute)}`}
                    title={(Attribute?.ValueAlias || Attribute.Value)}
                  >
                    {Attribute?.MiniImageUrl ?
                      <img src={Attribute.MiniImageUrl}
                        onClick={() => props.setActiveImg(Attribute.ImageUrl)}
                        alt={(Attribute?.ValueAlias || Attribute.Value)}
                        style={{ width: '2.5rem', height: '2.5rem' }} />
                      : characterLimiter((Attribute?.ValueAlias || Attribute.Value), 15)
                    }
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  );
};


export default LoadAttributes;


