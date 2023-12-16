import React, { useState } from "react";
import Button from "../../button";
import { SortIcon } from "../../icons";
import "../styles.scss";

const formatTableValue = (cell) => {
  const rowItemFormat = {
    money: (value) => parseInt(value, 10).toLocaleString("en-IN"),
  };

  if (cell.format && rowItemFormat[cell.format]) {
    return rowItemFormat[cell.format](cell.value);
  }
  return cell.value;
};

const TableComponent = ({
  searchText,
  recentCustomers,
  isFilters,
  isPagination,
  rowLabels,
}) => {
  const [sortColumnIndex, setSortColumnIndex] = useState();
  const [sortAscending, setSortAscending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    isPagination ? 10 : recentCustomers.length
  );
  const [searchTextState, setSearchTextState] = useState("");

  const onClickHeaderItem = (itemIndex) => {
    if (sortColumnIndex === itemIndex) {
      setSortAscending(!sortAscending);
    } else {
      setSortAscending(true);
    }
    setSortColumnIndex(itemIndex);
  };

  const applySorting = (itemA, itemB) => {
    if (typeof itemA.cells[sortColumnIndex].value === "number") {
      if (sortAscending) {
        return (
          itemA.cells[sortColumnIndex].value -
          itemB.cells[sortColumnIndex].value
        );
      }
      return (
        itemB.cells[sortColumnIndex].value - itemA.cells[sortColumnIndex].value
      );
    }

    if (sortAscending) {
      return itemA.cells[sortColumnIndex].value >
        itemB.cells[sortColumnIndex].value
        ? 1
        : -1;
    }
    return itemA.cells[sortColumnIndex].value >
      itemB.cells[sortColumnIndex].value
      ? -1
      : 1;
  };

  // Apply search filter
  const filteredList = searchText.length
    ? recentCustomers.filter(
        (item) =>
          item.cells &&
          item.cells.some(
            (cell) =>
              cell.value &&
              `${cell.value}`
                .toLowerCase()
                .indexOf(searchText.toLowerCase()) !== -1
          )
      )
    : recentCustomers;
  return (
    <div className="table-component">
      {isFilters && (
        <div className="filters">
          <div className="search">
            <input
              value={searchTextState}
              onChange={(event) => setSearchTextState(event.target.value)}
              placeholder="Search"
            />
          </div>
          {isPagination && (
            <div className="entries">
              <span>Entries: </span>
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(parseInt(event.target.value, 10));
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          )}
        </div>
      )}
      <div className="table-wrapper">
        <table cellSpacing="0">
          <thead>
            <tr>
              {/* Assuming rowLabels are available as a prop */}
              {rowLabels?.map((label, index) => (
                <th onClick={() => onClickHeaderItem(index)} key={label}>
                  <span key={index}>{label}</span>
                  {sortColumnIndex === index && (
                    <SortIcon
                      className={sortAscending ? "ascending" : "descending"}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredList.length ? (
              (typeof sortColumnIndex === "undefined"
                ? filteredList
                : filteredList.sort(applySorting)
              )
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((row, rowIndex) => (
                  <tr
                    key={`${rowIndex}-tr`}
                    onClick={() => props.onClickRow(row)}
                  >
                    {row.cells
                      ? row.cells.map((cell, index) => (
                          <td
                            key={`${index}:${cell.value}`}
                            {...(cell.attributes || {})}
                          >
                            {formatTableValue(cell)}
                          </td>
                        ))
                      : null}

                    {row?.action && (
                      <td>
                        <Button
                          text={row.action}
                          button="primary"
                          onClickBtn={() => props.onClickRow(row)}
                        />
                      </td>
                    )}
                  </tr>
                ))
            ) : (
              <tr key="empty-row">
                <td colSpan={rowLabels?.length}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isPagination && (
        <div className="pagination">
          {new Array(Math.ceil(filteredList.length / pageSize))
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`page-count ${
                  index + 1 === currentPage ? "active" : ""
                }`}
              >
                {index + 1}
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export default TableComponent;
