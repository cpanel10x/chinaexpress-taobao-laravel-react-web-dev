import React from "react";
import {Link} from "react-router-dom";
import SearchForm from "./includes/SearchForm";
import Logout from "./includes/Logout";

const Header = (props) => {
	const {customer, wishList, cart, settings} = props;

	return (
		<header className="header header-intro-clearance header-26">
			<div className="header-middle">
				<div className="container">
					<div className="header-left">
						<Link to="/" className="logo">
							<img
								src={'/assets/img/logo/chinaexpress.png'}
								alt={settings?.site_name}
							/>
						</Link>
					</div>

					<div className="header-center">
						<SearchForm/>
					</div>

					<div className="header-right">
						<div className="header-dropdown-link">
							<div className="wishlist">
								<Link to="/wishlist" title="Wishlist">
									<div className="icon">
										<i className="icon-heart-empty"/>
										<span className="wishlist-count badge">{wishList?.length || 0}</span>
									</div>
								</Link>
							</div>
							<div className="wishlist">
								<Link to="/checkout">
									<div className="icon">
										<i className="icon-shopping-bag"/>
										<span className="wishlist-count badge">{cart?.cart_items?.length || 0}</span>
									</div>
								</Link>
							</div>
							{customer?.id ? (
								<div className="dropdown cart-dropdown">
									<Link
										to="/dashboard"
										className="dropdown-toggle"
										role="button"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
										data-display="static"
									>
										<div className="icon">
											<i className="icon-user-male"/>
											<span className="d-md-inline d-none nav-item-text">
                        {customer?.name || "Customer"}
                      </span>
										</div>
									</Link>
									<div className="dropdown-menu dropdown-menu-right nav_customer_menus">
										<Link
											to="/dashboard"
											className="dropdown-item"
										>
											Dashboard
										</Link>
										<Link
											to="/dashboard/orders"
											className="dropdown-item"
										>
											My Orders
										</Link>
										<Link
											to="/dashboard/account"
											className="dropdown-item"
										>
											Account
										</Link>
										<Logout/>
									</div>
									{/* End .dropdown-menu */}
								</div>
							) : (
								<div className="cart-dropdown">
									<Link to="/login">
										<div className="icon">
											<i className="icon-user"/>
											<span className="d-md-inline d-none nav-item-text">
                        Login
                      </span>
										</div>
									</Link>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
