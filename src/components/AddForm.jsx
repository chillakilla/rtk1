import { useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Button from "./common/Button";
import { useDispatch, useSelector } from "react-redux";
import { addLetter } from "redux/modules/letters";
import axios from "axios";
import { logoutSuccess } from "redux/modules/authSlice";

export default function AddForm() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [member, setMember] = useState("카리나");

  const [initialNicknameSet, setInitialNicknameSet] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/letters");
        const fetchLetters = response.data;
        const allLetters = [...fetchLetters];
        dispatch(addLetter(allLetters));
      } catch (error) {
        console.error("fethcing error", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (user && !initialNicknameSet) {
    setNickname(user.nickname);
    setInitialNicknameSet(true);
  }

  const onAddLetter = async (event) => {
    event.preventDefault();

    if (!user) {
      return alert("로그인이 필요합니다.");
    }

    if (!nickname || !content) return alert("닉네임과 내용은 필수값입니다.");

    const newLetter = {
      id: uuid(),
      nickname,
      content,
      avatar: null,
      writedTo: member,
      createdAt: new Date(),
      userId: user.id,
    };
    console.log(newLetter);

    try {
      await axios.post("http://localhost:5000/letters", newLetter);
      dispatch(addLetter(newLetter));
      setNickname("");
      setContent("");
    } catch (error) {
      console.error("error adding letter", error);

      if (error.response && error.response.status === 401) {
        dispatch(logoutSuccess());
      }
    }
  };

  return (
    <Form onSubmit={onAddLetter}>
      <NicknameWrapper>
        <label>닉네임:</label>
        <NicknameText>{user ? user.nickname : ""}</NicknameText>
      </NicknameWrapper>
      <InputWrapper>
        <label>내용:</label>
        <textarea
          placeholder="최대 100글자까지 작성할 수 있습니다."
          maxLength={100}
          onChange={(event) => setContent(event.target.value)}
          value={content}
        />
      </InputWrapper>
      <SelectWrapper>
        <label>누구에게 보내실 건가요?</label>
        <select onChange={(event) => setMember(event.target.value)}>
          <option>카리나</option>
          <option>윈터</option>
          <option>닝닝</option>
          <option>지젤</option>
        </select>
      </SelectWrapper>
      <Button text="팬레터 등록" />
    </Form>
  );
}

const Form = styled.form`
  background-color: black;
  padding: 12px;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 12px;
  width: 500px;
  border-radius: 12px;
  margin: 20px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & label {
    width: 80px;
  }
  & input,
  textarea {
    width: 100%;
    padding: 12px;
  }
  & textarea {
    resize: none;
    height: 80px;
  }
`;

const SelectWrapper = styled(InputWrapper)`
  justify-content: flex-start;
  & label {
    width: 170px;
  }
`;

const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NicknameText = styled.p`
  font-weight: bold;
  color: white;
`;
