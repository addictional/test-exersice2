import React, {useState} from 'react';
import {useTable,useGroupBy,useFilters,useSortBy,useExpanded} from 'react-table';
import {IResponseRow} from '../../Models/ITableDTO'
import './style.sass';


export interface IRow extends IResponseRow {
    active : boolean;
}

interface IProps {
    data : Array<IRow>,
    onChange(data : any) :void;
    onRevert() : void;
}

export const Table : React.FC<IProps> = (props) => {
    const [data,updateData] = useState(props.data);
    const reset = () => {
        updateData((old) => {
            return old.map((el)=>{
                return {...el , active : false};
            })
        });
    }
    const onKeyPress  = (e :KeyboardEvent) => {
        if(e.keyCode === 27) {
            reset();
            props.onRevert();
        }
    }

    React.useEffect(() => {
            window.addEventListener('keyup',onKeyPress)
        return () => {
            window.removeEventListener('keyup',onKeyPress)
        }
    } )

    React.useEffect(() => {
        updateData(props.data);
    },[props.data]);
    
    const columns = React.useMemo(
        () => [
          {
            Header: 'Name',
            accessor: 'firstName', 
          },
          {
            Header: 'Last name',
            accessor: 'lastName',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
        ],
        []
      )
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<object>(
        {
            data,
            columns,
            defaultColumn :{
                Cell : ({
                    cell : {column },
                    value: initialValue,
                    row: { index,original },
                    column: { id },
                  }) => {
                    const [value, setValue] = React.useState(initialValue);
                    const [isDisabled, setDisabledValue] = React.useState(!(original as any).active);

                    const onDoubleClick = () => {
                        setDisabledValue(false);
                    }
                    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value)
                    }
                    
                    const handleBlur = function( e: any){
                        (original as any)[column.id] = e.target.value;
                        props.onChange(original);
                    }

                    const handleKeyUp = function(e: any){
                        if(e.keyCode === 13) {
                            (original as any)[column.id] = e.target.value;
                            props.onChange(original);
                        }
                    }
                    
                      // If the initialValue is changed external, sync it up with our state
                    React.useEffect(() => {

                        setValue(initialValue)
                        setDisabledValue(!(original as any).active);
                    }, [initialValue,original])
                    return ( <input disabled={isDisabled}  onDoubleClick={onDoubleClick} onBlur={handleBlur} onKeyUp={handleKeyUp}  value={value} onChange={onChange} />);
                }
            }
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
    );
    return (
    <React.Fragment>
        <table className="table" {...getTableProps()}>
            <thead>
                {// Loop over the header rows
                headerGroups.map(headerGroup => (
                // Apply the header row props
                <tr className="table__header" {...headerGroup.getHeaderGroupProps()}>
                    {// Loop over the headers in each row
                    headerGroup.headers.map(column => (
                    // Apply the header cell props
                    <th className="table__header-prop" {...column.getHeaderProps()}>
                        {// Render the header
                        column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
                {// Loop over the table rows
                rows.map((row,key) => {
                // Prepare the row for display
                prepareRow(row)
                return (
                    // Apply the row props
                    <tr className="table__body__row" onDoubleClick={
                        ()=>{
                            const item = data[(row.id as unknown as number) ];
                            item.active = true;
                            updateData((old) => {
                                return old.map((el,index)=>{
                                    if(index == (row.id as unknown as number)) {
                                        return {...el,active : true};
                                    } else {
                                        return {...el};
                                    }
                                })
                            });
                        }
                    } {...row.getRowProps()}>
                    {// Loop over the rows cells
                    row.cells.map(cell => {
                        // Apply the cell props
                        return (
                        <td className="table__body__prop" {...cell.getCellProps()}>
                            {// Render the cell contents
                            cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
                )
                })}
            </tbody>
    </table>
  </React.Fragment>
    );
};
