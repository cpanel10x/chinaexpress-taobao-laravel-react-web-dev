import React, {useEffect} from "react";
import {goPageTop} from "../../utils/Helpers";
import {useFavoriteProducts} from "../../api/ProductApi";
import RecentItems from "../home/includes/Products/NewArriveProduct/includes/RecentItems";
import {analyticsPageView} from "../../utils/AnalyticsHelpers";

const FavoriteProduct = (props) => {

    const {data: products, isLoading} = useFavoriteProducts();

    useEffect(() => {
        goPageTop();
        analyticsPageView();
    }, []);

    if (isLoading) {
        return '';
    }

    // if (!products?.id) {
    // 	return <Defaul404/>;
    // }

    return (
        <main className="main">

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card my-5">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <h2>Customer Favorite</h2>
                                    </div>
                                    <div className="cat-blocks-container">
                                        <RecentItems sectionCart={true} products={products}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};


export default FavoriteProduct;
