import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Исправлено с false на null для корректного отображения ошибок

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          setData([]);
          const res = await axios.get(url);
          setData(res.data);
        } catch (err) {
          setError(err.message); // Убедитесь, что вы используете err.message или другой подходящий способ получения сообщения об ошибке
        }
        setLoading(false);
      };
      fetchData();
    }, [url]);

    const reFetch = async () => {
      setLoading(true);
      try {
        setData([]);
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err.message); // Аналогично, убедитесь, что вы используете err.message
      }
      setLoading(false);
    };

    return { data, loading, error, reFetch };
};

export default useFetch;
