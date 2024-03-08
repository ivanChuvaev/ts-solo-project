import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

export default function CookieWarning(): JSX.Element {

  const [allowCookie, setAllowCookie] = useLocalStorage("allow-cookie", false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = (): void => {
    setIsOpen(false)
  }

  const handleAgree = (): void => {
    setAllowCookie(true);
    setIsOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(!allowCookie)
    }, 1000)
  }, [])

  return (
    <div className={clsx('cookie-warning', isOpen && 'open')}>
      <div className='cookie-warning-text'>
        We are using cookies, would you agree with that?
        you must agree with that, otherwise this warning will never disapper
      </div>
      <div className='cookie-warning-actions'>
        <Button icon={<CloseOutlined />}
          onClick={handleClose}
        />
        <Button icon={<CheckOutlined />}
          onClick={handleAgree}
        />
      </div>
    </div>
  )
}
