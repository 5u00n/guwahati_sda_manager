import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";

function login() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto ">
          <form className="flex max-w-md flex-col gap-4 bg-white p-6 rounded-lg shadow-md mx-auto">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Show Password</Label>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default login