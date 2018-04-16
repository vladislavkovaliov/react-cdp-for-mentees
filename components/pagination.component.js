import React from 'react';
import { makeStore } from '../utils/create-store.util';
import withRedux from 'next-redux-wrapper';
import ReactPaginate from 'react-paginate';

import debounce from 'lodash/debounce';

import { updateViewport } from '../actions/viewport.action';
import { PAGE_RANGE_DISPLAYED, MARGIN_PAGES_DISPLAYED, MOBILE_WIDTH, DEBOUNCE_VIEWPORT_UPDATE } from '../constants/values.constants';

export function onResizeWindow(callback) {
  return function() {
    callback({ isMobile: window.innerWidth < MOBILE_WIDTH });
  }
}

export class Pagination extends React.Component {
  state = {
    total: 0,
    offset: 0,
    limit: 0,
  };

  componentWillMount() {
    const { updateViewport } = this.props;

    updateViewport({ isMobile: window.innerWidth < MOBILE_WIDTH });
  }

  componentDidMount() {
    const { updateViewport } = this.props;

    window.addEventListener('resize', debounce(onResizeWindow(updateViewport), DEBOUNCE_VIEWPORT_UPDATE));
  }

  render() {
    const { isMobile } = this.props.window;

    return (
      <ReactPaginate
        containerClassName="pagination"
        pageRangeDisplayed={isMobile ? 0 : PAGE_RANGE_DISPLAYED}
        marginPagesDisplayed={isMobile ? 0 : MARGIN_PAGES_DISPLAYED}
        {...this.props} />
    );
  }
}

export const mapStateToProps = ({ window }) => ({
  window,
});

export const mapDispatchToProps = (dispatch) => ({
  updateViewport: payload => updateViewport(dispatch, payload),
});

export default withRedux(
  makeStore,
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
