import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function useUser() {

    const { data: session } = useSession();
    const [user, setUser] = useState([])
    useEffect(() => {
      const fetchUserData = async () => {
        // @ts-ignore
        if (session && session?.user && session.user.userId) {
          try {
            // @ts-ignore
            const response = await fetch(`${process.env.NEXT_PUBLIC_USER_URL}/user/${session.user.userId}`);
             if (response.ok) {
              const userData = await response.json();
              console.log("Información adicional del usuario:", userData);
              setUser(userData);
              // Realiza las acciones necesarias con la información adicional del usuario
            } else {
              console.error("Error al obtener información del usuario:", response.statusText);
            }
          } catch (error) {
            console.error("Error al obtener información del usuario:", error);
          }
        }
      };

      // Llama a fetchUserData solo si session cambia
      fetchUserData();
    }, [session]);
return { user };
  
}
