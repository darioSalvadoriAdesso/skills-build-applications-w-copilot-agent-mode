import React, { useEffect, useState, useCallback } from 'react';
import { Table, Card, Button, Spinner, Alert } from 'react-bootstrap';

function renderTable(items) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const first = items[0];
  if (typeof first !== 'object') {
    return (
      <Table responsive striped hover className="app-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((v, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{String(v)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const cols = Object.keys(first);
  return (
    <Table responsive striped hover className="app-table">
      <thead>
        <tr>
          {cols.map((c) => (
            <th key={c}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row, idx) => (
          <tr key={row.id || idx}>
            {cols.map((c) => (
              <td key={c}>{row[c] != null ? String(row[c]) : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);

  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const payload = data && data.results ? data.results : data;
        setItems(Array.isArray(payload) ? payload : [payload]);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData, reload]);

  return (
    <Card className="app-card">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Workouts</h4>
        <div className="small-actions">
          <Button variant="outline-secondary" size="sm" onClick={() => setReload((r) => r + 1)}>
            Refresh
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        {loading && (
          <div className="text-center py-3">
            <Spinner animation="border" />
          </div>
        )}
        {error && <Alert variant="danger">Error loading workouts.</Alert>}
        {!loading && !error && items.length === 0 && <div className="empty-state">No workouts found.</div>}
        {!loading && !error && items.length > 0 && renderTable(items)}
      </Card.Body>
    </Card>
  );
}
