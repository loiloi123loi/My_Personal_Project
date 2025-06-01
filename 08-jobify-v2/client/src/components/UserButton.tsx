interface Props {
  afterSignOutUrl: string
}

function UserButton({ afterSignOutUrl }: Props) {
  return <div>btn {afterSignOutUrl}</div>
}

export default UserButton
