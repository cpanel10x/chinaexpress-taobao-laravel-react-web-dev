import React from 'react';
import {getSetting} from "../../utils/Helpers";
import {useQuery} from "react-query";
import {getSettings} from "../../api/GeneralApi";

const CopyRight = (props) => {
	const {width, settings} = props;

	const copyright_text = settings?.copyright_text || 'All Rights are reserved by sumontech';

	return (
		<div className="footer-bottom font-weight-normal" style={width <= 751 ? {marginBottom: "60px"} : {marginBottom: "0"}}>
			<div className="container">
				<p className="footer-copyright font-weight-normal ml-lg-2 second-primary-color">
					Copyright © {copyright_text}
				</p>
				<div className="social-icons social-icons-color justify-content-center">
					<span className="social-label">Social Media</span>
					{
						settings?.facebook &&
						<a
							href={settings.facebook}
							className="social-icon social-facebook"
							title="Facebook"
							target="_blank"
							rel="noreferrer"
						>
							<i className="icon-facebook"/>
						</a>
					}

					{
						settings?.twitter &&
						<a
							href={settings.twitter}
							className="social-icon social-twitter"
							title="Twitter"
							target="_blank"
							rel="noreferrer"
						>
							<i className="icon-twitter"/>
						</a>
					}
					{
						settings?.instagram &&
						<a
							href={settings.instagram}
							className="social-icon social-instagram"
							title="Instagram"
							target="_blank"
							rel="noreferrer"
						>
							<i className="icon-instagram-1"/>
						</a>
					}
					{
						settings?.youtube &&
						<a
							href={settings.youtube}
							className="social-icon social-youtube"
							title="Youtube"
							target="_blank"
							rel="noreferrer"
						>
							<i className="icon-youtube-play"/>
						</a>
					}
				</div>
			</div>
		</div>
	);
};

export default CopyRight;
