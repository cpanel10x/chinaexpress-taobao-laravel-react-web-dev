import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import {isEmpty, isObject} from "lodash";
import parser from "html-react-parser";
import {goPageTop} from "../../utils/Helpers";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import PageSkeleton from "../../skeleton/PageSkeleton";
import My404Component from "../404/My404Component";
import {useCustomPageData} from "../../api/GeneralApi";

const Faq = () => {

	const {data: faqs, isLoading} = useCustomPageData('faqs', 'faqs');

	useEffect(() => {
		goPageTop();
	});

	if (isLoading) {
		return <PageSkeleton/>;
	}

	if (!faqs?.length) {
		return <My404Component/>;
	}

	return (
		<main className="main">

			<div className="page-content">
				<div className="container">
					<div
						className="accordion accordion-rounded"
						id="accordion-1"
					>
						{
							faqs?.map((faq, key) => (
								<div
									key={faq.id}
									className="card card-box card-sm bg-light"
								>
									<div
										className="card-header"
										id={`heading-${faq.id}`}
									>
										<h2 className="card-title">
											<a
												role="button"
												data-toggle="collapse"
												href={`#collapse-${faq.id}`}
												className={
													key > 0 && "collapsed"
												}
												aria-expanded={
													key === 0 ? "true" : "false"
												}
												aria-controls={`collapse-${faq.id}`}
											>
												{parser(faq.post_title)}
											</a>
										</h2>
									</div>
									{/* End .card-header */}
									<div
										id={`collapse-${faq.id}`}
										className={
											key === 0
												? "collapse show"
												: "collapse"
										}
										aria-labelledby={`heading-${faq.id}`}
										data-parent={`#accordion-1`}
									>
										<div className="card-body">
											{parser(faq.post_content)}
										</div>
										{/* End .card-body */}
									</div>
									{/* End .collapse */}
								</div>
							))}
					</div>
				</div>
			</div>
			<div
				className="cta cta-display bg-image pt-4 pb-4"
				style={{
					backgroundImage: "url('/images/bg-7.jpg')",
				}}
			>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-md-10 col-lg-9 col-xl-7">
							<div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
								<div className="col">
									<h3 className="cta-title text-white">
										If You Have More Questions
									</h3>
									<p className="cta-desc text-white">
										Feel free to contact with us.
									</p>
								</div>
								<div className="col-auto">
									<Link
										to="/contact"
										className="btn btn-outline-white"
									>
										<span>CONTACT US</span>
										<i className="icon-long-arrow-right"/>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default withRouter(Faq);
