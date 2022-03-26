import React, {useState} from "react";
import {withRouter, useLocation} from "react-router";
import {loadPictureSearchProducts} from "../../utils/Services";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const MobileSearchForm = props => {
  
	const query = useQuery();
	const keyword = query.get("keyword");

	const [search, setSearch] = useState("");

	const submitTextSearch = e => {
		e.preventDefault();
		props.history.push(`/search?keyword=${search}`);
	};

	const submitPictureSearch = e => {
		e.preventDefault();
		const selectedFile = e.target.files[0];
		if (selectedFile.name !== undefined) {
			let formData = new FormData();
			formData.append("picture", selectedFile);
			loadPictureSearchProducts(formData).then(response => {
				let picture = response.picture;
				let search_id = response.search_id;
				if (search_id && picture) {
					history.push(`/search/picture/${search_id}`);
				}
			});
		}
	};

	return (
		<div className="container d-block">
			<input
				type="file"
				onChange={e => submitPictureSearch(e)}
				name="picture"
				className="d-none"
				id="lg_picture_search"
				accept="image/*"
			/>

			<form onSubmit={e => submitTextSearch(e)} method="get">
				<div className="input-group">
					<input
						type="text"
						id="search"
						value={search || ""}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search million products by keyword or image"
						className="form-control"
					/>
					<div className="input-group-append">
						<label
							className="btn btn-search label_btn"
							htmlFor="lg_picture_search"
						>
							<i className="icon-camera"/>
						</label>
						<button className="btn btn-search" type="submit">
							<i className="icon-search"/>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};


export default withRouter(MobileSearchForm);
