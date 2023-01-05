import React from 'react'

interface Props {
    children: React.ReactNode
}

const MainLayout = (props: Props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default MainLayout
