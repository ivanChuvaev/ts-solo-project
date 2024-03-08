import React, { useEffect, useState } from 'react'
import DContainer from './DContainer';

export default function Footer(): JSX.Element {

  const [ip, setIp] = useState<string>('');

  useEffect(() => {
    void (async () => {
      const res = await fetch('https://api.ipify.org?format=json');
      if (res.ok) {
        const data = await res.json() as { ip: string };
        setIp(data.ip);
      } else {
        setIp('Error');
      }
    })()
  }, [])

  return (
    <DContainer>
      <div>
        Your IP: {ip === '' ? 'Loading...' : ip}
      </div>
    </DContainer>
  )
}
