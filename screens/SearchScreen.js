import * as React from 'react';
import { StyleSheet, Text, View ,ScrollView, FlatList, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'

export default class SearchScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      allTransactions : [],
      lastVisibleTransaction : null,
      search : ''
    }
  }

  componentDidMount = async()=>{
    const query = await db.collection("transactions").limit(10).get();
    console.log();
    query.docs.map((doc)=>{
      this.setState({
      
        allTransactions: [],
        lastVisibleTransaction: doc
        
      })
    })

      // ... are called spread operator(for loop ) 
    /* Explanantion for Spread operator  ...
    var arr  = [1,2, 3,4,5,6,7,8];
    var arr1 = [...arr, 9]
    console.log(arr1)
    arr1 = [...arr1, 10]
    console.log(arr1)
    for(var i =0; i<arr.length(); i++){
        arr1.push(arr)
    }*/
  }
  
  searchTransactions= async(text)=>{
    var enteredText = text.split("");
    var text = text.toUpperCase();
    if(enteredText[0].toUpperCase() === "B"  ){
      const transaction = await db.collection("transactions").where("bookId","==",text).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions : [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction : doc
        })
      })
    }else if(enteredText[0].toUpperCase() === "S" ){
      const transaction = await db.collection("transactions").where("studentId","==",text).get()
      transaction.docs.map((doc)=>{
        this.setState({
          allTransactions : [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction : doc
        })
      })
    }
  }

  fetchMoreTransactions = async()=>{
    var text = this.state.search.toUpperCase();
    var enteredText = text.split("");
    
    if(enteredText[0].toUpperCase() === "B"  ){
      const query = await db.collection("transactions").where("bookId","==",text)
      .startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions : [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction : doc
        })
      })
    }else if(enteredText[0].toUpperCase() === "S" ){
      const query = await db.collection("transactions").where("studentId","==",text)
      .startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions : [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction : doc
        })
      })
    }
  }

  render(){
    return (
      <View style = {styles.container}>
        <View style = {styles.searchBar}>
          <TextInput 
            style = {styles.bar}
            placeholder = "Enter BookId or StudentId"
            onChangeText = {(text)=>{this.setState({
              search : text
            })}}
          />
          
          <TouchableOpacity style = {styles.searchButton}
            onPress = {()=>{
              this.searchTransactions(this.state.search)
            }}
          >
            <Text>Search</Text>
          </TouchableOpacity>  
          
        </View>
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
    </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  searchBar:{
    flexDirection:'row',
    height:40,
    width:'auto',
    borderWidth:0.5,
    alignItems:'center',
    backgroundColor:'grey',

  },
  bar:{
    borderWidth:2,
    height:30,
    width:300,
    paddingLeft:10,
  },
  searchButton:{
    borderWidth:1,
    height:30,
    width:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'green'
  }
})


