import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import parser from "html-react-parser";
import {goPageTop} from "../../utils/Helpers";
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
			<div className="container">
				<div className="card my-3 my-md-4">
					<div className="card-body">
						{
							faqs?.map((faq, key) =>
								<div key={key} className="mb-3 card">
									<div className="card-body">
										<div className="card-title">
											<h3>{parser(faq.post_title)}</h3>
										</div>
										{parser(faq.post_content)}
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>


		</main>
	);
};

export default withRouter(Faq);
