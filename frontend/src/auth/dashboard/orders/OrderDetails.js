import React, {useEffect} from "react";
import {goPageTop} from "../../../utils/Helpers";
import {useParams, withRouter} from "react-router-dom";
import PageSkeleton from "../../../skeleton/PageSkeleton";
import {useCustomerOrderDetails} from "../../../api/ApiDashboard";
import Defaul404 from "../../../pages/404/Defaul404";
import OrderBody from "./includes/OrderBody";
import {useSettings} from "../../../api/GeneralApi";
import OrderSummary from "./includes/OrderSummary";
import RePayment from "./includes/RePayment";
import Breadcrumb from "../../../pages/breadcrumb/Breadcrumb";

const OrderDetails = props => {
	const {tran_id} = useParams();
	const {data: settings} = useSettings();
	const {data: order, isLoading} = useCustomerOrderDetails(tran_id);

	useEffect(() => {
		goPageTop();
	}, [tran_id]);

	if (isLoading) {
		return <PageSkeleton/>;
	}


	if (!order?.order_number) {
		return <Defaul404/>;
	}

	const currency = settings?.currency_icon || '৳';
	const ShippingCharges = settings?.air_shipping_charges || '';
	const order_items = order?.order_items || [];


	return (
		<main className="main bg-gray">
			<div className="page-content">
				<Breadcrumb
					current={'Order details'}
					collections={[
						{name: 'Dashboard', url: 'dashboard'},
						{name: 'Orders', url: 'dashboard/orders'},
					]}
				/>
				<div className="container">
					<div className="row justify-content-center">
						<aside className="col-md-12 col-lg-8">
							<div className="card my-3">
								<div className="card-body">
									<h2>Order details #{order.order_number}</h2>
									<hr className="my-2"/>

									<div className="row">
										<div className="col">
											<strong>Details</strong>
										</div>
										<div className="col text-right"><strong>Total</strong></div>
									</div>

									<hr className="my-2"/>

									{
										order_items?.length > 0 &&
										order_items.map((product, index) =>
											<OrderBody product={product} currency={currency} key={index}/>
										)
									}

									<OrderSummary order_items={order_items} currency={currency}/>

									{order?.status === 'waiting-for-payment' && <hr className="my-2"/>}

									{order?.status === 'waiting-for-payment' && <RePayment order={order}/>}

								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</main>
	);
};


export default withRouter(OrderDetails);
