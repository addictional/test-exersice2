import React from 'react';
import {Table,IRow} from './Components/Table';
import {useStore,connect} from 'react-redux';
import {update} from './Store/Actions';




const App : React.FC<any> = ({update}) => {
  const store = useStore();
  const rows =  store.getState().users.map((row : any) => {
    return {...row,active : false};
  }) as Array<IRow>;
  return (
    <div>
      <Table data={rows} onChange={(data)=>{
        update(data);
      }}/>
    </div>
  );
}

const mapDispatchToProps = { update };
export default connect(null,mapDispatchToProps)(App);
