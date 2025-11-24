import { useEffect, useState } from 'react';
import FormattedDuration from 'react-intl-formatted-duration';

export default function QueryTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(t => t + 1), 1000);
    return () => clearInterval(id); // cleanup on unmount
  }, []);

  return <FormattedDuration seconds={seconds} />;
}
