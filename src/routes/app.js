import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import moment from 'moment'
import { Pane, Paneset } from '@folio/stripes/components';
import { Datepicker, MultiColumnList, Row, Col, ButtonGroup, Button } from '@folio/stripes-components'
import LogChart from '../components/LogChart'

const App = props => {
  const [hasError, setErrors] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(null)
  const [state, setState] = useState({
    rawData: [],
    filteredData: [],
    filters: {
      startDate: moment().subtract(30, 'days').format('L'),
      endDate: moment().format('L')
    }
  })

  async function fetchData() {
    const url = "http://localhost:8001/ldp/db/log"
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setLoading(false)
          setState({
            ...state,
            rawData: resp,
            filteredData: resp
          })
        })
        .catch(err => {
          setLoading(false)
          console.error(err)
          setErrors(`Failed connect to database`)
        })
    } catch (error) {
      setLoading(false)
      setErrors(`Failed connecting to server ${url}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const buttonGroup = (
    <ButtonGroup fullWidth>
      <Button buttonStyle={'primary'} >Logs</Button>
      <Button>Console</Button>
      <Button>Hooks</Button>
    </ButtonGroup>
  )

  const handleStartDateChange = e => {
    const startDate = new Date(e.target.value)
    let newFilteredData = state.rawData.filter(log => startDate < new Date(log.logTime))
    if(state.filters.endDate) {
      const endDate = new Date(state.filters.endDate)
      newFilteredData = newFilteredData.filter(log => endDate > new Date(log.logTime))
    }
    const newState = {
      ...state,
      filteredData: newFilteredData,
      filters: {
        ...state.filters,
        startDate: moment(startDate).format('L')
      }
    }
    setState(newState)
  }
  const handleEndDateChange = e => {
    const endDate = new Date(e.target.value)
    let newFilteredData = state.rawData.filter(log => endDate > new Date(log.logTime))
    if(state.filters.startDate) {
      const startDate = new Date(state.filters.startDate)
      newFilteredData = newFilteredData.filter(log => startDate < new Date(log.logTime))
    }
    const newState = {
      ...state,
      filteredData: newFilteredData,
      filters: {
        ...state.filters,
        endDate: moment(endDate).format('L')
      }
    }
    setState(newState)
  }

  return (
    <Paneset>
      <Pane defaultWidth="28%">
        {buttonGroup}
        {startDate}
        <Datepicker label="Start" onChange={handleStartDateChange} value={state.filters.startDate} />
        <Datepicker label="End" onChange={handleEndDateChange} value={state.filters.endDate} />
      </Pane>
      <Pane defaultWidth="fill" fluidContentWidth paneTitle="ldpsystem.log">
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'stretch'
        }}>
            <div style={{ height: 200, paddingBottom: 10 }}>
            { state.filteredData && state.filteredData.length > 0 ?
              <LogChart
                series={state.filteredData}
                startDate={state.filters.startDate}
                endDate={state.filters.endDate}
              />
              : <div/>
            }
            </div>
            <div style={{
              position: 'relative',
              flex: 1,
              alignItems: 'stretch'
            }}>
              <div style={{
                position: 'absolute',
                height: '100%',
                width: '100%'
              }}>
              { state.filteredData && state.filteredData.length > 0 ?
                <MultiColumnList autosize virtualize contentData={state.filteredData} />
                : <div/>
              }
              </div>
            </div>
        </div>
      </Pane>
    </Paneset>
  );
}

App.propTypes = {
  match: PropTypes.object.isRequired,
}

export default App
