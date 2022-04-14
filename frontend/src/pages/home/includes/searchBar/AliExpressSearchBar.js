import {last, replace, split} from "lodash";
import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import swal from "sweetalert";
import {urlSearchParams} from "../../../../utils/AliHelpers";

function AliExpressSearchBar(props) {
	const [search, setSearch] = useState("");

	const submitExpressSearch = (event) => {
		event.preventDefault();
		if (search) {
			props.history.push(`/aliexpress/search?url=${search}`);
		} else {
			swal({
				text: "Paste a valid link",
				icon: "warning",
			});
		}
	};

	return (
		<div className="section my-3">
			<div className="container">
				<div className="aliExpressSearchBar mt-2">
					<div className=" row align-items-center">
						<div className="col-md-3 d-none d-md-block">
							<img src={`/assets/img/aliExpress.gif`} className="img-fluid aliExpressLogo" alt="aliExpress"/>
						</div>
						<div className="col-md-9 aliSearchFormCol">
							<img src={`/assets/img/paste-aliExpress-link.gif`} className="img-fluid aliExpressText" alt="aliExpressText"/>
							<form
								className="ali_express_search_form"
								method="get"
								onSubmit={(event) => submitExpressSearch(event)}>
								<div className="input-group">
									<input
										type="text"
										className="form-control"
										onChange={(event) =>
											setSearch(
												event.target.value
											)
										}
										placeholder="Search By Aliexpress Link"
									/>
									<div className="input-group-append">
										<button
											type="submit"
											className="btn btn-search"
										>
											<i className="icon-search"/>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(AliExpressSearchBar);
