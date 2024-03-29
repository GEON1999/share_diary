# 암호화

### 단방향 암호화

![Untitled](https://velog.velcdn.com/images%2Fiamhayoung%2Fpost%2F59634218-ad89-4edc-a961-a85853333c83%2Fimage.png)

- 단방향 암호화는 평문을 암호화 할 수 있지만 암호화된 문자를 다시 복호화 할 수 없다.
- 주로 메시지 또는 파일의 무결성을 보장하기 위해 사용된다.
- 해시의 무결성을 보장하는 특징을 이용하여 데이터의 식별자, 비밀번호, 블록체인 등에서 활용되고 있다.

- 해시 알고리즘은 동일한 평문에 대하여 항상 동일한 해시 값을 갖는다.
    - 특정 해시 알고리즘에 대해 특정 평문이 어떤 해시 값을 갖는 지 알 수 있다.
    - 해시 함수의 해시 값들을 정리한 테이블을 레인보우 테이블이라고 한다.
        - 이를 통해 하는 해킹 공격을 레인보우 공격이라고 한다.

**솔팅**

- salt 는 **아주 작은 임의의 랜덤한 텍스트** 를 뜻함
- 본래 데이터에 랜덤한 값을 추가하여 암호화 하는데 쓰임

**키 스트레칭**

- 해싱 후 출력된 해시 값을 반복해서 해싱하는 방식
