import React from 'react';

const AliShipmentInfo = props => {
    const {product} = props;
    const productId = product?.commonModule?.productId;
    // const {resData, isLoading} = SwrGetRequest(
    //     productId ? `/default/aliexpress/shipment/${productId}` : null
    // );

    const resData  = {};
    const isLoading  = true;

    if (isLoading) {
        return '';
    }
    const shipment = resData?.data?.result;
    const freightResult = shipment?.body?.freightResult;

    // console.log('shipment', shipment);
    console.log('freightResult', freightResult);


    return (
        <div className="form-group">
            <label htmlFor="shipping_method">Shipping Method</label>
            {
                freightResult?.length &&
                <select className="form-control" id="shipping_method">
                    {
                        freightResult?.map((freight, key) =>
                            <option value="1" key={key}>{`${freight.company} | ${freight?.standardFreightAmount?.formatedAmount}`}</option>
                        )
                    }
                </select>
            }
        </div>
    );
};


export default AliShipmentInfo;
