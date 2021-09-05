import * as React from 'react';
import { StyleSheet, Text, View ,ScrollView, FlatList} from 'react-native';
import db from '../config'

export default class SearchScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      allTransactions : [],
      lastVisibleTransaction : null
    }
  }

  componentDidMount = async()=>{
    const query = await db.collection("transactions").get();
    console.log();
    query.docs.map((doc)=>{
      this.setState({
        // ... are called spread operator(for loop ) 
        allTransactions : [...this.state.allTransactions, doc.data()]
        
      })
    })
    /*
    var arr  = [1,2, 3,4,5,6,7,8];
    var arr1 = [...arr, 9]
    console.log(arr1)
    arr1 = [...arr1, 10]
    console.log(arr1)
    for(var i =0; i<arr.length(); i++){
        arr1.push(arr)
    }*/
  }
  
  render(){
    return (<View>
      <Text>Search Screen</Text> 
      <FlatList 
       data = {this.state.allTransactions}
       renderItem = {({item})=>(
        <View style={{borderBottomWidth:2}}>
          <Text>{"Book Id: " +item.bookId}</Text>  
          <Text>{"Student Id: " +item.studentId}</Text>
          <Text>{"Transaction Type: " +item.transactionType}</Text>            
        </View>
       )}
       keyExtractor = {(item , index)=>{index.toString()}}
        onEndReached = {this.fetchMoreTransactions}
        onEndReachedThreshold  = {0.7}
      />

      {
      //renderItem = {({item})=>()}
      }
      
    </View>
    );
  }
  
}


