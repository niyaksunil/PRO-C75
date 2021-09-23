import * as React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity, TextInput ,KeyboardAvoidingView, Image, Alert} from 'react-native';
import * as firebase from 'firebase'


export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId : "",
            password : ''
        }
    }
    login = async(emailId,password)=>{
        console.log(emailId+"*****"+password);
        if(emailId && password){
            try{
                console.log(firebase.auth());                
                const response = await firebase.auth().signInWithEmailAndPassword(emailId,password)
                console.log(response);
                if(response){
                    this.props.navigation.navigate("Transaction")
                }
            }catch(error){
                switch (error.code) {
                    case 'auth/user-not-found':
                      Alert.alert("user dosen't exists")
                      console.log("user doesn't exist")
                      break
                    case 'auth/invalid-email':
                      Alert.alert('incorrect email or password')
                      console.log('invaild')
                      break
                  }

            }

        }else{
            Alert.alert('enter email and password');
        }
    }

    render(){
        return(
            <KeyboardAvoidingView  style = {{alignItems:'center',marginTop:20}}>
                <View>                    
                    <Image 
                    source = {require("../assets/booklogo.jpg")}
                    style = {{width : 200, height: 200}}
                    />
                    <Text style={{textAlign: 'center', fontSize: 30}}>Willy App</Text>
                </View>
                <View>
                    <TextInput 
                    style = {styles.loginBox}
                    placeholder = "ABC@example.com"
                    keyboardType = "email-address"
                    onChangeText = {(text)=>{   
                        this.setState({
                            emailId : text
                        })
                    }}
                    />

                    <TextInput 
                    style = {styles.loginBox}                    
                    secureTextEntry = {true}
                    placeholder = "enter password"
                    onChangeText = {(text)=>{
                        this.setState({
                            password : text
                        })
                    }}
                    />
                </View>
                <View>
                    <TouchableOpacity 
                    style={{height:30,width:90,borderWidth:1,marginTop:20,paddingTop:5,borderRadius:7}}
                    onPress = {()=>{
                        this.login(this.state.emailId , this.state.password);
                    }}>
                     <Text style={{textAlign:'center'}}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
                
        )
    }
}


const styles = StyleSheet.create({
    loginBox:
    {
      width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    margin:10,
    paddingLeft:10
    }
  })