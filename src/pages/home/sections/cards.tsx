/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from "react";
import {
  ActionsContainer,

  ContentContainer,

} from "./styles";

import {  useGetLocationMutation } from "src/data/locations";
import { Button, Flex, Input } from "antd";
import FormItem from "src/components/form-item";
import { Controller, useForm } from "react-hook-form";
import Error from "src/components/error-message";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const CardsSection = () => {
const [position, setPosition] = useState([51.505, -0.09])
  const [getLocation, response] = useGetLocationMutation();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    getLocation(data)
  };

  
useEffect(() => {
  console.log('response',response?.data);

  if(response?.data?.latitude&&response?.data?.longitude)
  setPosition([response?.data?.latitude,response?.data?.longitude])
  
}, [response]);
  return (
    <ContentContainer>
      <ActionsContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormItem label="Address" required>
            <Controller
              name="address"
              rules={{
                required: { message: "Address is required", value: true },
              }}
              control={control}
              render={({ field }) => {
                return <Input {...field} placeholder="Address" />;
              }}
            />
            <Error errors={errors} name="address" />
          </FormItem>
          <FormItem label="Email" >
            <Controller
              name="email"
              control={control}
              render={({ field }) => {
                return <Input {...field} placeholder="Email" />;
              }}
            />
            <Error errors={errors} name="address" />
          </FormItem>
          <Flex justify="center">
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Flex>
        </form>
        { (
          <MapContainer
          //@ts-ignore
            center={position as any}

            zoom={3}
            scrollWheelZoom={false}
          >
            <TileLayer
          //@ts-ignore
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </ActionsContainer>
    </ContentContainer>
  );
};

export default CardsSection;
