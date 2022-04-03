import React, {useState} from "react";
import $ from "jquery";
import {loadPictureSearchProducts} from "../../utils/Services";
import {useLocation, withRouter} from "react-router-dom";
import {useEffect} from "react";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const SearchForm = (props) => {
	const query = useQuery();
	const keyword = query.get("keyword");

	const [search, setSearch] = useState('');


	const submitTextSearch = (e) => {
		e.preventDefault();
		props.history.push(`/search?keyword=${search}`);
	};

	const submitPictureSearch = (e) => {
		e.preventDefault();
		const selectedFile = e.target.files[0];
		if (selectedFile.name !== undefined) {
			let formData = new FormData();
			formData.append("picture", selectedFile);
			loadPictureSearchProducts(formData).then((response) => {
				let picture = response.picture;
				let search_id = response.search_id;
				if (search_id && picture) {
					history.push(`/search/picture/${search_id}`);
				}
			});
		}
	};

	useEffect(() => {
		$(document).on("click", ".btn_file_search", function (e) {
			$("#lg_picture_search").trigger("click");
		});
	}, []);

	return (
		<div className="header-search header-search-visible header-search-no-radius">
			<input
				type="file"
				onChange={(e) => submitPictureSearch(e)}
				name="picture"
				className="d-none"
				id="lg_picture_search"
				accept="image/*"
			/>

			<form onSubmit={(e) => submitTextSearch(e)} method="get">
				<div className="header-search-wrapper search-wrapper-wide">
					<label htmlFor="search" className="sr-only">
						Search
					</label>
					<input
						type="search"
						className="form-control"
						id="search"
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search million products by keyword or image"
						autoComplete="off"
						required
					/>

					<button
						type="button"
						className="btn btn-search label_btn btn_file_search"
					>
						<i className="icon-camera"/>
					</button>

					<button className="btn btn-primary" type="submit">
						<i className="icon-search"/>
					</button>
				</div>
			</form>
		</div>
	);
};


export default withRouter(SearchForm);
