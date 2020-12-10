import React from 'react'
import AddNew from 'components/CustomComponents/AddNew'

const CardWithTitle = ({ title, children, linkToAdd, attribute, onClickAdd, onClickDelete, button }) => {
  return (
    <div className="card">
      <div className="card-header">
        <div className="header-content">
          <div className="utils__title">
            <strong>{title}</strong>
          </div>
          {(linkToAdd || onClickAdd) && (
            <div className="add-item">
              <AddNew
                link={linkToAdd}
                onClickAdd={onClickAdd}
                onClickDelete={onClickDelete}
                attribute={attribute}
                button={button}
              />
            </div>
          )}
        </div>
      </div>
      <div className="card-body">
        {/* <h4 className="text-black mb-3">
            <strong>Basic info</strong>
          </h4> */}
        {children}
      </div>
    </div>
  )
}

export default CardWithTitle
