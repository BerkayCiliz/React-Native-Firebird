import React, {Component, useState } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, SafeAreaView,ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default class App extends Component{
  state ={
    resimYeri: null,
    resimAdi:null,
    resimPath:null
  }
  
resimSec =async () =>{  
  ImagePicker.showImagePicker({noData:true,mediaType:'photo'},(res) => {
    console.log('Res = ', res);
    this.state.resimAdi = res.fileName;
    this.state.resimPath = res.path;

    if (res.didCancel) {
      console.log('Geri Dönüldü');
  
      
    } else {
      
      this.setState({
        resimYeri: res.uri,
        resimAdi: res.fileName,
        resimPath: res.path
      });
      }
  });
}

  
   dosyaGonder = async () => {
    const uzantı = storage().ref(this.state.resimAdi);
    const dosyaYolu = `${utils.FilePath.PICTURES_DIRECTORY}/${this.state.resimAdi}`;
    await uzantı.putFile(dosyaYolu);
  }
 


 render() {
   
  return (
    <View style={styles.container}>

    {
      this.state.resimYeri && <Image source={{uri:this.state.resimYeri}} style={{width:'80%',height:400, resizeMode:'contain'}}/>
    }  
    <Button title="Resim Seçiniz" onPress={this.resimSec}/>

    <Button title="Seçilen Resmi Yükleyiniz" onPress={this.dosyaGonder}/>
    </View>
  );
 }}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#224'
  }
  
  
  
});







