import { usersAtom } from "@/atom/atom"
import { useRecoilValue } from "recoil"



export const useGetUsers = () => {
    const usersState = useRecoilValue(usersAtom);

    const users = usersState.map((users: any) => {
        return users.username
    });

    return users;
}
