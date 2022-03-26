import React, { useEffect } from "react";
import parser from "html-react-parser";
import { goPageTop } from "../../utils/Helpers";
import { isEmpty, isObject } from "lodash";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import { SwrGetRequest } from "../../utils/SwrRequests";
import PageSkeleton from "../../skeleton/PageSkeleton";
import My404Component from "../404/My404Component";
import { useSettings } from "../../api/Queries";

const Contact = () => {

  const settings = useSettings();

  const { resData, isLoading } = SwrGetRequest(`/default/contact-us`);

  const pageData = () => {
    const data = isObject(resData) ? resData.data : {};
    if (!isEmpty(data)) {
      return data.contact;
    }
    return {};
  };

  const contact = pageData();

  useEffect(() => {
    goPageTop();
  }, [resData]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isEmpty(contact)) {
    return <My404Component />;
  }

  const submitContactForm = (event) => {
    event.preventDefault();
    alert("development progress");
  };

  return (
    <main className="main">
      <div className="container">
        <div className="card my-5">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 mb-2 mb-lg-0">
                <h2 className="title mb-1">
                  Contact Information
                </h2>
                <div className="mb-3">
                  {contact.post_content &&
                    parser(contact.post_content)}
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="contact-info">
                      <h3>The Office</h3>
                      <ul className="contact-list">
                        <li>
                          <i className="icon-map-marker" />
                          {settings?.office_address || ''}
                        </li>
                        <li>
                          <i className="icon-phone" />
                          <a
                            href={`tel:${settings?.office_phone || ''}`}
                          >
                            {settings?.office_phone || ''}
                          </a>
                        </li>
                        <li>
                          <i className="icon-envelope" />
                          <a
                            href={`mailto:${settings?.office_email || ''}`}
                          >
                            {settings?.office_email || ''}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <h2 className="title mb-1">
                      Got Any Questions?
                    </h2>
                    {/* End .title mb-2 */}
                    <p className="mb-2">
                      Use the form below to get in
                      touch with the sales team
                    </p>
                    <form
                      onSubmit={(event) =>
                        submitContactForm(event)
                      }
                      className="contact-form mb-3"
                    >
                      <div className="row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="cname"
                            className="sr-only"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="cname"
                            placeholder="Name *"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                        <div className="col-sm-6">
                          <label
                            htmlFor="email"
                            className="sr-only"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email *"
                            required
                          />
                        </div>
                        {/* End .col-sm-6 */}
                      </div>
                      {/* End .row */}
                      <div className="row">
                        <div className="col-sm-6">
                          <label
                            htmlFor="cphone"
                            className="sr-only"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            id="cphone"
                            placeholder="Phone"
                          />
                        </div>
                        {/* End .col-sm-6 */}
                        <div className="col-sm-6">
                          <label
                            htmlFor="csubject"
                            className="sr-only"
                          >
                            Subject
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="csubject"
                            placeholder="Subject"
                          />
                        </div>
                        {/* End .col-sm-6 */}
                      </div>
                      {/* End .row */}
                      <label
                        htmlFor="cmessage"
                        className="sr-only"
                      >
                        Message
                      </label>
                      <textarea
                        className="form-control"
                        cols={30}
                        rows={4}
                        id="cmessage"
                        required
                        placeholder="Message *"
                        defaultValue={""}
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-primary-2 btn-minwidth-sm"
                      >
                        <span>SUBMIT</span>
                        <i className="icon-long-arrow-right" />
                      </button>
                    </form>
                  </div>
                </div>
                {/* End .row */}
              </div>
              {/* End .col-lg-6 */}
              <div className="col-lg-6">
                {settings?.g_map_iframe_url && (
                  <div className="embed-responsive embed-responsive-1by1">
                    <iframe
                      className="embed-responsive-item"
                      src={settings.g_map_iframe_url}
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default Contact;
