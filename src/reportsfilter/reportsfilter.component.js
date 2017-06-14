const CheckboxToggleGroup = (props) => {
  return (
		<div className='row'>
			<div className='accordion-item col-sm-12 col-md-3 col-lg-3'>
				<div onClick={ props.toggle } id={props.id}>{props.name}</div>
			    {props.expandedState  && props.items.map(item => {
            var checked = props.query[props.id].some((eachObj) => eachObj.key === item.key)
            return(
			      <div className='items' key={item.key}>
            <Checkbox handleClick={props.handleClick} checked={checked} identifier={item} id={props.id}/>
            {item.value}
            </div>)
			    })}
			</div>
		</div>
			);
};

const Checkbox = ({ handleClick, checked, identifier, id }) => <input type='checkbox' checked={checked} onClick={(e) => handleClick(e.target.checked, identifier, id)} />
const Bubble = ({each, item, handleClick}) => <div><span>{each.value}</span>  <span onClick={(e) => handleClick(false, each, item)}>&#10006;</span></div>
const Bubbles = ({query, handleClick}) => {
  return(
    <div>
    <div>Filter results by: </div>
    {Object.keys(query).map((item) => query[item].map((each) => <Bubble each={each} handleClick={handleClick} item={item}/>))}
    </div>
  )
}

import React, { PropTypes, Component } from 'react';
import './reportsfilter.css';
import datalist from './datalist';
import DatepickerBundle from './datepickerbundle/datepickerbundle.component';
import moment from 'moment';
class ReportsFilter extends Component {
  state = {query: {regions:[], countries:[], channels: [], partners:[], branches:[], agents:[], dates: []}, startDateToDisplay: '', endDateToDisplay: '', applyDatesButtonDisabled: true }

	toggle = (e) => {
    this.setState((prevState) =>
    ({ [event.target.id] : !prevState[event.target.id] }))}
  submitButtonClick = (e) => {
    this.setState({initialSearchTriggered: true})
    this.callService()
  }
  callService = () => console.log('Called Service')
  handleClick = (AddItem, identifier, id) => {
    let query = this.state.query;
    switch (AddItem) {
      case true:
        query[id].push(identifier)
        this.state.showBubbles ? this.setState({query}) : this.setState({showBubbles: true, query})
      break;
      case false:
      query[id] = query[id].filter((item) => item !== identifier)
      const showBubbles = Object.keys(query).some(key => query[key].length > 0)
      this.setState({showBubbles, query})
      break;
      default:
      break;
    }
  }
  applyDatesButtonClick = () => {this.setState({applyDatesButtonDisabled: true})}
  handleChangeStartDate = (startDateToDisplay) => this.setState({ startDateToDisplay, checked:'', applyDatesButtonDisabled: false })
  handleChangeEndDate = (endDateToDisplay) => this.setState({ endDateToDisplay, checked:'', applyDatesButtonDisabled: false })
  timeFrameCheckboxClicked = (e, name) => {
    switch (name){
    case 'today':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), applyDatesButtonDisabled: true})
    break;
    case 'oneWeek':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(7,'d').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), applyDatesButtonDisabled: true})
    break;
    case 'oneMonth':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(1,'months').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), applyDatesButtonDisabled: true})
    break;
    case 'threeMonths':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(3,'months').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), applyDatesButtonDisabled: true})
    break;
    case 'oneYear':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:moment().subtract(1,'years').format('YYYY-MM-DD'), endDate: moment().format('YYYY-MM-DD'), applyDatesButtonDisabled: true})
    break;
    case 'all':
      this.setState({checked: name, startDateToDisplay:'', endDateToDisplay:'', startDate:'', endDate: '', applyDatesButtonDisabled: true})
    break;
    default:
    break;
  }
  }

  render() {
    const dataList = datalist()
let { regions, countries, channels, partners, branches, agents } = dataList;
    return (
      <div>
        {regions && <CheckboxToggleGroup name={'Regions'} items={regions} id={'regions'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.regions} query={this.state.query}/>}
        {this.state.showBubbles && this.state.initialSearchTriggered && <Bubbles query={this.state.query} handleClick={ this.handleClick } checked={this.state.checked}/> }
        {<DatepickerBundle id={'dates'} state={this.state} applyDatesButtonClick={this.applyDatesButtonClick} handleChangeStartDate={this.handleChangeStartDate} handleChangeEndDate={this.handleChangeEndDate} checked={this.state.checked} toggle={this.toggle} expandedState={this.state.dates} timeFrameCheckboxClicked={this.timeFrameCheckboxClicked}/>}
        {countries && <CheckboxToggleGroup name={'Countries'} items={countries} id={'countries'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.countries} query={this.state.query}/>}
        {channels && <CheckboxToggleGroup name={'Channels'} items={channels} id={'channels'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.channels} query={this.state.query}/>}
        {partners && <CheckboxToggleGroup name={'Partners'} items={partners} id={'partners'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.partners} query={this.state.query}/>}
        {branches && <CheckboxToggleGroup name={'Branches'} items={branches} id={'branches'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.branches} query={this.state.query}/>}
        {agents && <CheckboxToggleGroup name={'Agents'} items={agents} id={'agents'} handleClick={ this.handleClick } toggle={this.toggle} expandedState={this.state.agents} query={this.state.query}/>}
        <button disabled={!this.state.showBubbles} onClick={this.submitButtonClick}>Submit</button>
      </div>
    );
  }
}
ReportsFilter.propTypes = {
  loading: PropTypes.bool
};

ReportsFilter.defaultProps = {
  loading: false
};

export default ReportsFilter;
