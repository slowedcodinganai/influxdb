import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ColorScaleDropdown from 'shared/components/ColorScaleDropdown'

import {updateLineColors} from 'src/dashboards/actions/cellEditorOverlay'

class LineGraphColorSelector extends Component {
  handleSelectColors = colorScale => {
    const {handleUpdateLineColors} = this.props
    const {colors} = colorScale

    handleUpdateLineColors(colors)
  }

  render() {
    const {lineColors} = this.props

    return (
      <div className="form-group col-xs-12">
        <label>Line Colors</label>
        <ColorScaleDropdown
          onChoose={this.handleSelectColors}
          stretchToFit={true}
          selected={lineColors}
        />
      </div>
    )
  }
}

const {arrayOf, func, shape, string} = PropTypes

LineGraphColorSelector.propTypes = {
  lineColors: arrayOf(
    shape({
      type: string.isRequired,
      hex: string.isRequired,
      id: string.isRequired,
      name: string.isRequired,
    }).isRequired
  ).isRequired,
  handleUpdateLineColors: func.isRequired,
}

const mapStateToProps = ({cellEditorOverlay: {lineColors}}) => ({
  lineColors,
})

const mapDispatchToProps = dispatch => ({
  handleUpdateLineColors: bindActionCreators(updateLineColors, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  LineGraphColorSelector
)
