import React from 'react';
import {useParams} from "react-router-dom";

const AliSellerPage = (props) => {

	const {shop_id, seller_id} = useParams();


	console.log('shop_id', shop_id)
	console.log('seller_id', seller_id)

	return (
		<main className="main">
			<div className="container">
				<div className="card my-5">
					<div className="card-body">
						<h2 className="title">AliExpress seller page</h2>
						<div className="mb-3">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi cumque debitis, delectus dignissimos distinctio doloremque eos est, et facilis hic magni nesciunt nihil optio repellendus similique? Facilis hic quidem velit.
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default AliSellerPage;