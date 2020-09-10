import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import { Datepicker, MultiColumnList, Row, Col, ButtonGroup, Button } from '@folio/stripes-components'
import LogChart from '../components/LogChart'

function isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const blankLogs = [{logTime: '', tableName: '', elapsedTime: '', message: ''}]

const LogsPage = props => {
  const [hasError, setErrors] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [startDate, setStartDate] = useState(null)
  const [state, setState] = useState({
    rawData: [],
    filteredData: blankLogs,
    filters: {
      startDate: moment().subtract(30, 'days').format('L'),
      endDate: moment().format('L')
    }
  })

  async function fetchData() {
    const url = `${process.env.LDP_BACKEND_URL}/ldp/db/log`
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setLoading(false)
          setState({
            ...state,
            rawData: resp,
            filteredData: applyDateFilters(resp)
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

  const applyDateFilters = data => {
    data = applyEndDateFilter(applyStartDateFilter(data))
    if(isEmpty(data)) {
      return blankLogs
    }
    return data
  }
  const applyStartDateFilter = data => {
    if(state.filters.startDate) {
      const startDate = new Date(state.filters.startDate)
      return data.filter(log => startDate < new Date(log.logTime))
    }
    return data
  }
  const applyEndDateFilter = data => {
    if(state.filters.endDate) {
      const endDate = new Date(state.filters.endDate)
      return data.filter(log => endDate > new Date(log.logTime))
    }
    return data
  }

  const handleStartDateChange = e => {
    const startDate = new Date(e.target.value)
    let newFilteredData = state.rawData.filter(log => startDate < new Date(log.logTime))
    newFilteredData = applyEndDateFilter(newFilteredData)
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
    newFilteredData = applyStartDateFilter(newFilteredData)
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
  console.log('state.filteredData', state.filteredData)

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: 5, flex: 1 }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Row style={{ margin: '1em 0' }} >
            <Col style={{ paddingLeft: 12, paddingRight: 10 }} >
              <Datepicker label="Start" onChange={handleStartDateChange} value={state.filters.startDate} />
            </Col>
            <Col>
              <Datepicker label="End" onChange={handleEndDateChange} value={state.filters.endDate} />
            </Col>
          </Row>
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
            <div style={{ height: 200, paddingBottom: 10 }}>
            <LogChart
              series={state.filteredData}
              startDate={state.filters.startDate}
              endDate={state.filters.endDate}
            />
            </div>
            
            <div style={{
              position: 'relative',
              flex: 1,
              alignItems: 'stretch'
            }}>
              <div style={{ height: '100%' }}> 
                { state.filteredData && state.filteredData.length > 0 ?
                  <MultiColumnList autosize virtualize contentData={state.filteredData} />
                  : <div/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

LogsPage.propTypes = {
  match: PropTypes.object.isRequired,
}

export default LogsPage
