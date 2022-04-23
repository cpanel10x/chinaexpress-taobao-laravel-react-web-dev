import React from 'react';
import {Link} from "react-router-dom";
import AliSearchForm from "../home/includes/searchBar/includes/AliSearchForm";
import {useMediaQuery} from "react-responsive";

const AliExpressProduct404 = () => {
	const isMobile = useMediaQuery({query: '(max-width: 991px)'});

	return (
		<main className="main">
			<div className="container">
				<div className="card mt-2 my-lg-5">
					<div className="card-body">
						<div className="error-content text-center">
							<img src={`/assets/img/404.jpg`} className="img-fluid mx-auto" alt="404" style={{maxWidth: isMobile ? '10rem' : '12rem'}}/>
							<h3 className="error-title">Product not found. </h3>
							<p>We are sorry! The product you are search is not available.</p>

							<div className="controlAliSearchForm">
								<AliSearchForm/>
							</div>

							<div className="pb-5 my-5">
								<Link
									to={'/'}
									className="btn btn-default px-3"
								>
									<span>Shop More</span>
									<i className="icon-right"/>
								</Link>
							</div>

						</div>
					</div>
				</div>
			</div>

		</main>
	);
};

export default AliExpressProduct404;
