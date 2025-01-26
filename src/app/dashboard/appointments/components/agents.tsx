"use client";

import { SelectContent, SelectItem } from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import { getAllUsersAction } from "../../(team)/users/actions";
import { User } from "@/db/schema";
import { Badge } from "@/components/ui/badge";

export default function AgentSelect() {
  const [users, setUsers] = useState<Omit<User, 'hashedPassword'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const [fetchedUsers] = await getAllUsersAction();
        setUsers(fetchedUsers || []);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to fetch users. Cause: ${err}`);
        setIsLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <SelectContent>
        <SelectItem value="loading" disabled>
          Loading agents...
        </SelectItem>
      </SelectContent>
    );
  }

  if (error) {
    return (
      <SelectContent>
        <SelectItem value="error" disabled>
          {error}
        </SelectItem>
      </SelectContent>
    );
  }

  return (
    <SelectContent>
      <SelectItem value="none">No Specific Agent</SelectItem>
      {users.map((user) => (
        <SelectItem key={user.id} value={user.id}>
          {user?.firstName} {user?.lastName} <Badge className="rounded-full" variant={'secondary'}>{user?.role.toLocaleLowerCase()}</Badge>
        </SelectItem>
      ))}
    </SelectContent>
  );
}
