import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import { Pane, Paneset } from '@folio/stripes/components';
import { MultiColumnList } from '@folio/stripes-components'
import LogChart from '../components/LogChart'

const App = props => {
  const [hasError, setErrors] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [resp, setResp] = useState({
    groups: {},
    buckets: [],
    list: []
  });

  async function fetchData() {
    const url = "http://localhost:8001/ldp/db/log"
    try {
      const resp = await fetch(url)
      resp
        .json()
        .then(resp => {
          setLoading(false)
          let groups = {}, buckets = []
          for(let i=0; i<resp.length; i++) {
            const item = resp[i]
            if(item['tableName'] === '') item['tableName'] = '[no table]'
            if(!(item['tableName'] in groups)) {
              const idx = buckets.push({
                "label" : item['tableName'],
                "data": []
              })
              groups[item['tableName']] = idx - 1
            }
            const idx = groups[item['tableName']]
            buckets[idx].data.push({
              x: new Date(item["logTime"]),
              y: item["elapsedTime"]
            })
          }
          setResp({
            groups, buckets, list: resp
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

  return (
    <Paneset>
      <Pane defaultWidth="fill" fluidContentWidth paneTitle="ldpsystem.log">
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'stretch'
        }}>
            <div style={{ height: 200, paddingBottom: 10 }}>
              <LogChart series={resp.buckets} />
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
              { resp.list && resp.list.length > 0 ? <MultiColumnList autosize virtualize contentData={resp.list} /> : <div/>}
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
