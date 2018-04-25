import React from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from "react-redux";
import debounce from 'lodash/debounce';
import { updateViewport } from '../actions/viewport.action';
import { 
  PAGE_RANGE_DISPLAYED, 
  MARGIN_PAGES_DISPLAYED, 
  MOBILE_WIDTH, 
  DEBOUNCE_VIEWPORT_UPDATE 
} from '../constants/values.constants';

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

  componentDidMount() {
    const { updateViewport } = this.props;

    window.addEventListener(
      'resize',
      debounce(onResizeWindow(updateViewport), DEBOUNCE_VIEWPORT_UPDATE)
    );
  }

  render() {
    // TODO: wait when bug will be fixed
    const { isMobile = false } = this.props.window || { isMobile: false };

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination);
