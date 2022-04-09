import React, {useState} from "react";
import {withRouter} from "react-router";
import {useQuery} from "../../utils/customHooks";
import {useSearchPictureUpload} from "../../api/ProductApi";
import swal from "sweetalert";
import SearchSuggestion from "./SearchSuggestion";

const MobileSearchForm = props => {
	const query = useQuery();
	const keyword = query.get("keyword");
	const [showSuggestion, setShowSuggestion] = useState(false);

	const {mutateAsync, isLoading} = useSearchPictureUpload();

	const [search, setSearch] = useState("");

	const submitTextSearch = e => {
		e.preventDefault();
		if (search) {
			props.history.push(`/search?keyword=${search}`);
		} else {
			swal({
				text: 'Type your keyword first',
				icon: 'info',
				button: 'Dismiss'
			})
		}
	};

	const submitPictureSearch = async (e) => {
		e.preventDefault();
		const selectedFile = e.target.files[0];
		if (selectedFile.name !== undefined) {
			let formData = new FormData();
			formData.append("picture", selectedFile);
			await mutateAsync(formData)
				.then(response => {
					let picture = response.picture;
					let search_id = response.search_id;
					if (search_id && picture) {
						props.history.push(`/search/picture/${search_id}`);
					}
				});
		}
	};

	const searchQueryInput = (event) => {
		const inputValue = event.target.value;
		setSearch(inputValue);
		if (inputValue.length > 2) {
			setShowSuggestion(true);
		}else{
			setShowSuggestion(false);
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

			<form onSubmit={e => submitTextSearch(e)} method="get" autoComplete={'off'}>
				<div className="input-group">
					<input
						type="text"
						id="search"
						value={search || ""}
						onChange={event => searchQueryInput(event)}
						placeholder="Search million products by keyword or image"
						className="form-control"
						autoComplete={'off'}
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
			{
				showSuggestion === true &&
				<SearchSuggestion search={search} setShowSuggestion={setShowSuggestion}/>
			}
		</div>
	);
};


export default withRouter(MobileSearchForm);
