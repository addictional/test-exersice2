import React from 'react';
import {Table,IRow} from './Components/Table';
import {useStore,connect} from 'react-redux';
import {update,revert} from './Store/Actions';




const App : React.FC<any> = ({update,revert}) => {
  const store = useStore();
  const rows =  store.getState().users.map((row : any) => {
    return {...row,active : false};
  }) as Array<IRow>;
  return (
    <div>
      <Table onRevert={revert} data={rows} onChange={(data)=>{
        update(data);
      }}/>
    </div>
  );
}

const mapDispatchToProps = { update ,revert};
export default connect(null,mapDispatchToProps)(App);
