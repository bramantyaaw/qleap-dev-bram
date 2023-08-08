import React, { Component } from "react";

class PageTitle extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="card shadow-xss w-100 d-block d-flex border-0 p-4 mb-3">
        <h2
          className="fw-700 mb-0 mt-0 text-grey-900 d-flex align-items-center py-2"
          style={{ fontWeight: "700", fontSize: "25px" }}
        >
          {title}
          {/* <form action="#" className="pt-0 pb-0 ms-auto">
            <div className="search-form-2 ms-2">
              <i className="ti-search font-xss"></i>
              <input
                type="text"
                className="form-control text-grey-500 mb-0 bg-greylight theme-dark-bg border-0"
                placeholder="Search here."
              />
            </div>
          </form>
          <div
            className="btn-round-md ms-2 bg-greylight text-gray-500 theme-dark-bg rounded-3"
            role="button"
          >
            <Icon
              path={searchIcon}
              size={1}
              className=" font-xss text-grey-500"
            />
          </div> */}
        </h2>
        <p
          className="mb-0 text-kinda-light-dark font-xsss"
          style={{ fontWeight: "400" }}
        >
          Media berbagi dokumentasi, kegiatan-kegiatan Erajaya yang dilakukan
          oleh para karyawan
        </p>
      </div>
    );
  }
}

export default PageTitle;
